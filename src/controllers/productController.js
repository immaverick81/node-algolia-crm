const ProductDetail = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const algoliasearch = require('algoliasearch');

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

exports.syncDataToAlgolia = catchAsync(async (req, res, next) => {
	const algolia = algoliasearch(process.env.ALGOLIA_API_ID, process.env.ALGOLIA_ADMIN_API_KEY);
	const galvanizedIndex = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME_GALVANIZED);
	const hotRollIndex = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME_HOT_ROLL);
	const galvanealIndex = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME_GALVANEAL);
	const galvalumeIndex = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME_GALVALUME);
	const electroGalvanizedIndex = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME_ELECTRO_GALVANIZED);
	const coldRollIndex = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME_COLD_ROLL);
	const galvanizedRecords = [];
	const galvanealRecords = [];
	const galvalumeRecords = [];
	const hotrollRecords = [];
	const coldrollRecords = [];
	const electrogalvanizedRecords = [];
	const doc = await ProductDetail.find();
	doc.forEach((item) => {
		if (item.PRODUCT.includes('HOT ROLLED')) {
			hotrollRecords.push(item);
		} else if (item.PRODUCT.includes('ELECTRO GALVANIZED')) {
			electrogalvanizedRecords.push(item);
		} else if (item.PRODUCT === 'COLD ROLLED' || item.PRODUCT.includes('CR PRIME')) {
			coldrollRecords.push(item);
		} else if (item.PRODUCT.includes('GALVANIZED')) {
			galvanizedRecords.push(item);
		} else if (item.PRODUCT.includes('GALVANEAL')) {
			galvanealRecords.push(item);
		} else if (item.PRODUCT.includes('GALVALUME')) {
			galvalumeRecords.push(item);
		}
	});
	// console.log(galvanizedRecords.length);
	// console.log(coldrollRecords.length);
	// console.log(electrogalvanizedRecords.length);
	console.log(hotrollRecords);
	// console.log(galvalumeRecords.length);

	hotRollIndex
		.saveObjects(hotrollRecords, { autoGenerateObjectIDIfNotExist: true })
		.then(({ objectIDs }) => {
			console.log(objectIDs);
			console.log('Hot roll steel data imported into Algolia');
		})
		.catch((error) => {
			console.error('Error when importing steel details into Algolia', error);
			process.exit(1);
		});
	galvanizedIndex
		.saveObjects(galvanizedRecords)
		.then(() => {
			console.log('Galvanized steel data imported into Algolia');
		})
		.catch((error) => {
			console.error('Error when importing steel details into Algolia', error);
			process.exit(1);
		});

	coldRollIndex
		.saveObjects(coldrollRecords)
		.then(() => {
			console.log('Cold Rolled steel data imported into Algolia');
		})
		.catch((error) => {
			console.error('Error when importing steel details into Algolia', error);
			process.exit(1);
		});

	electroGalvanizedIndex
		.saveObjects(electrogalvanizedRecords)
		.then(() => {
			console.log('Electro Galvanized steel data imported into Algolia');
		})
		.catch((error) => {
			console.error('Error when importing steel details into Algolia', error);
			process.exit(1);
		});

	galvalumeIndex
		.saveObjects(galvalumeRecords)
		.then(() => {
			console.log('Galvalume steel data imported into Algolia');
		})
		.catch((error) => {
			console.error('Error when importing steel details into Algolia', error);
			process.exit(1);
		});
	galvanealIndex
		.saveObjects(galvanealRecords)
		.then(() => {
			console.log('Galvaneal steel data imported into Algolia');
		})
		.catch((error) => {
			console.error('Error when importing steel details into Algolia', error);
			process.exit(1);
		});
	// SEND RESPONSE
	res.status(200).json({
		status: 'success',
		data: 'Product updated successfully.'
	});
});
