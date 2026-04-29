import Service from '../models/Service.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import { removeVietnameseTones } from '../utils/stringUtils.js';

// @desc    Lấy danh sách dịch vụ (Có Lọc, Tìm kiếm, Phân trang, Sắp xếp)
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res, next) => {
    try {
        const {
            keyword,
            type,
            areas,       // Khu vực: "Hải Châu,Sơn Trà"
            minPrice,
            maxPrice,
            hasDiscount, // true/false
            minRating,   // 3, 4, 5
            sort,        // price_asc, price_desc, rating_desc
            page = 1,
            limit = 6    // Giới hạn 6 item/trang
        } = req.query;

        // 1. XÂY DỰNG BỘ LỌC (QUERY)
        const query = { approvalStatus: 'APPROVED' };

        if (type && type !== 'ALL') query.type = type;

        if (keyword) {
            const normalizedKeyword = removeVietnameseTones(keyword);
            // Tìm các dịch vụ có searchString chứa từ khóa, "i" là không phân biệt hoa thường
            query.searchString = { $regex: normalizedKeyword, $options: 'i' };
        }

        if (areas) {
            const areaArray = areas.split(',').map(area => new RegExp(area.trim(), 'i'));
            query.address = { $in: areaArray };
        }

        if (hasDiscount === 'true') query.discount = { $gt: 0 };
        if (minRating) query['ratingStats.averageRating'] = { $gte: Number(minRating) };

        if (minPrice || maxPrice) {
            query.finalPrice = {};
            if (minPrice) query.finalPrice.$gte = Number(minPrice);
            if (maxPrice) query.finalPrice.$lte = Number(maxPrice);
        }

        // 2. XÂY DỰNG SẮP XẾP (SORT)
        let sortObj = { createdAt: -1 };
        if (sort === 'price_asc') sortObj = { finalPrice: 1 };
        if (sort === 'price_desc') sortObj = { finalPrice: -1 };
        if (sort === 'rating_desc') sortObj = { 'ratingStats.averageRating': -1 };

        // 3. TÍNH TOÁN PHÂN TRANG (PAGINATION)
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;

        // 4. THỰC THI TRUY VẤN (SONG SONG)
        const [services, total] = await Promise.all([
            Service.find(query)
                .sort(sortObj)
                .skip(skip)
                .limit(limitNum)
                .select('-__v'),
            Service.countDocuments(query)
        ]);

        const totalPages = Math.ceil(total / limitNum);

        // 5. TRẢ VỀ RESPONSE CHUẨN
        return ApiResponse.send(res, 200, 'Lấy danh sách dịch vụ thành công', services, {
            count: services.length,
            total,
            page: pageNum,
            totalPages,
            hasMore: pageNum < totalPages
        });

    } catch (error) {
        next(error);
    }
};