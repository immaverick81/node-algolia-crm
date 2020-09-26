const ProductDetail = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
exports.addproduct = catchAsync(async (req, res, next) => {
	const allProd = req.body.data;
	await allProd.forEach((item) => {
		ProductDetail.create({
			COILNUMBER: item.COILNUMBER,
			PRODUCT: item.PRODUCT,
			QUALITY: item.QUALITY,
			LOCATION: item.LOCATION,
			WIDTH_IN: item.WIDTH_IN,
			WIDTH_MM: item.WIDTH_MM,
			THICKNESS_IN: item.THICKNESS_IN,
			THICKNESS_MM: item.THICKNESS_MM,
			THICKNESSSPEC: item.THICKNESSSPEC,
			LENGTH_IN: item.LENGTH_IN,
			LENGTH_MM: item.LENGTH_MM,
			WEIGHT_LB: item.WEIGHT_LB,
			WEIGHT_KG: item.WEIGHT_KG,
			PARTNUMBER: item.PARTNUMBER,
			TAGNUMBER: item.TAGNUMBER,
			GRADE: item.GRADE,
			QUALITY: item.QUALITY,
			PIW: item.PIW,
			ROCKWELL: item.ROCKWELL,
			YIELD: item.YIELD,
			ELONGATION: item.ELONGATION,
			TENSILE: item.TENSILE,
			GUAGE: item.GUAGE,
			PRICE: item.PRICE,
			HARDNESS: item.HARDNESS,
			COATING: item.COATING,
			VENDOR: item.VENDOR,
			MILL: item.MILL,
			C: item.C,
			MN: item.MN,
			P: item.P,
			S: item.S,
			SI: item.SI,
			AL: item.AL,
			CR: item.CR,
			NB: item.NB,
			TI: item.TI,
			CA: item.CA,
			N: item.N,
			NI: item.NI,
			CU: item.CU,
			V: item.V,
			B: item.B,
			PASS_OIL: item.PASS_OIL,
			FINISH: item.FINISH,
			TEMPER: item.TEMPER,
			CATEGORY: item.CATEGORY,
			COATING: item.COATING,
			PRODUCT_IMAGE_URL: item.PRODUCT_IMAGE_URL
		});
	});

	res.status(201).json({
		status: 'success',
		data: { message: 'Product added successfully.' }
	});
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
	let filter = {};
	const totalRec = await ProductDetail.find();
	// if (req.params.tourId) filter = { tour: req.params.tourId };
	// .filter()
	// .sort()
	// .limitFields()
	const features = new APIFeatures(ProductDetail.find(filter), req.body).paginate();
	const doc = await features.query;
	// SEND RESPONSE
	res.status(200).json({
		status: 'success',
		results: totalRec.length,
		data: doc
	});
});

exports.updateProduct = catchAsync(async (req, res, next) => {
	const coilNumber = req.body.data['_id'];
	console.log(req.body.data);
	const doc = await ProductDetail.findByIdAndUpdate(coilNumber, req.body.data, {
		new: true,
		runValidators: true
	});
	// SEND RESPONSE
	res.status(200).json({
		status: 'success',
		data: 'Product updated successfully.'
	});
});

// exports.updateProduct = catchAsync(async (req, res, next) => {
//     const coilNumber = req.body?.COILNUMBER;
// 	const doc = await ProductDetail.findByIdAndUpdate(coilNumber, req.body, {
// 		new: true,
// 		runValidators: true
// 	});

// 	if (!doc) {
// 		return next(new AppError('No document found with that ID', 404));
// 	}

// 	res.status(200).json({
// 		status: 'success',
// 		data: {
// 			data: 'Product updated successfully.'
// 		}
// 	});
// });
