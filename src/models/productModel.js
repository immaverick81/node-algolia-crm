const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
	COILNUMBER: {
		type: String
	},
	PRODUCT: {
		type: String
	},
	QUALITY: {
		type: String
	},
	LOCATION: {
		type: String
	},
	WIDTH_IN: {
		type: Number
	},
	WIDTH_MM: {
		type: Number
	},
	THICKNESS_IN: {
		type: Number
	},
	THICKNESS_MM: {
		type: Number
	},
	LENGTH_IN: {
		type: Number
	},
	LENGTH_MM: {
		type: Number
	},
	LENGTH_MM: {
		type: Number
	},
	WEIGHT_LB: {
		type: Number
	},
	PARTNUMBER: {
		type: String
	},
	TAGNUMBER: {
		type: String
	},
	THICKNESSSPEC: {
		type: String
	},
	GRADE: {
		type: String
	},
	QUALITY: {
		type: String
	},
	PIW: {
		type: String
	},
	ROCKWELL: {
		type: String
	},
	YIELD: {
		type: String
	},
	ELONGATION: {
		type: String
	},
	TENSILE: {
		type: String
	},
	GUAGE: {
		type: String
	},
	PRICE: {
		type: Number
	},
	HARDNESS: {
		type: String
	},
	COATING: {
		type: String
	},
	VENDOR: {
		type: String
	},
	MILL: {
		type: String
	},
	C: {
		type: Number
	},
	MN: {
		type: Number
	},
	P: {
		type: Number
	},
	S: {
		type: Number
	},
	SI: {
		type: Number
	},
	AL: {
		type: Number
	},
	CR: {
		type: Number
	},
	NB: {
		type: Number
	},
	TI: {
		type: Number
	},
	CA: {
		type: Number
	},
	N: {
		type: Number
	},
	NI: {
		type: Number
	},
	CU: {
		type: Number
	},
	V: {
		type: Number
	},
	B: {
		type: Number
	},
	PASS_OIL: {
		type: String
	},
	FINISH: {
		type: String
	},
	TEMPER: {
		type: String
	},
	CATEGORY: {
		type: String
	},
	PRODUCT_IMAGE_URL: {
		type: String
	}
});

productDetailSchema.pre(/^find/, function(next) {
	// this points to the current query
	this.find({ active: { $ne: false } });
	next();
});

const ProductDetail = mongoose.model('ProductDetail', productDetailSchema);

module.exports = ProductDetail;
