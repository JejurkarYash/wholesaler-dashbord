import mongoose, { model, Schema, Types } from "mongoose";

//
const vendorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
});
const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  catogory: { type: String },
});

const allProductDetilsSchema = new Schema({
  serialNumber: { type: Number, required: true, unique: true },
  productId: { type: mongoose.Types.ObjectId, ref: "Products", required: true },
  color: String,
  size: String,
  price: { type: String, required: true },
  status: { type: String, enum: ["available", "sold"] },
});

const vendorOrderSchema = new Schema({
  vendorId: { type: mongoose.Types.ObjectId, ref: "Vendors" },
  orders: [
    {
      orderId: { type: mongoose.Types.ObjectId, auto: true },
      productId: { type: mongoose.Types.ObjectId, ref: "Products" },
      totalQuantity: { type: Number, required: true },
      deliveredQuantity: { type: Number, default: 0 },
      pendingQuantity: { type: Number, required: true },
      orderTotalPrice: { type: Number, require: true },
      orderDate: { type: Date, default: Date.now },
      productSerialNumbers: [
        {
          serialNumber: { type: Number, require: true, uniqu: true },
        },
      ],
    },
  ],
});
const customerOrderSchema = new Schema({
  customerId: { type: mongoose.Types.ObjectId, ref: "Customers" },
  orders: [
    {
      orderId: { type: mongoose.Types.ObjectId, auto: true },
      productId: { type: mongoose.Types.ObjectId, ref: "Products" },
      totalQuantity: { type: Number, required: true },
      deliveredQuantity: { type: Number, default: 0 },
      pendingQuantity: { type: Number, required: true },
      orderTotalPrice: { type: Number, require: true },
      orderDate: { type: Date, default: Date.now },
      productSerialNumbers: [
        {
          serialNumber: { type: Number, require: true, unique: true },
        },
      ],
    },
  ],
});

const vendorInvoiceSchema = new Schema({
  orderId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "VenderOrders",
      required: true,
    },
  ],
  vendorId: {
    type: mongoose.Types.ObjectId,
    ref: "Vendors",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: { type: Number, require: true },
      price: { type: Number, require: true },
      total: { type: Number, require: true },
    },
  ],
  invoiceDate: { type: Date, default: Date.now },
  totalAmount: { type: Number, require: true },
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
});
const customerInvoiceSchema = new Schema({
  orderId: [
    {
      type: mongoose.Types.ObjectId,
      ref: "VenderOrders",
      required: true,
    },
  ],
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: { type: Number, require: true },
      price: { type: Number, require: true },
      total: { type: Number, require: true },
    },
  ],
  invoiceDate: { type: Date, default: Date.now },
  totalAmount: { type: Number, require: true },
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
});

// exporting all schema's
export const CustomerModel = new model("Customers", customerSchema);
export const VendorModel = new model("Vendors", vendorSchema);
export const ProductModel = new model("Products", productSchema);
export const AllProductDetilsModel = new model(
  "AllProductDetails",
  allProductDetilsSchema
);
export const VendorOrdersModel = new model("VendorOrders", vendorOrderSchema);
export const CustomerOrdersModel = new model(
  "CustomerOrders",
  customerOrderSchema
);
export const VendorInvoiceModel = new model(
  "VendorsInvoice",
  vendorInvoiceSchema
);
export const CustomerInvoiceModel = new model(
  "CustomerInvoice",
  customerInvoiceSchema
);
