//company schema
import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a company name']
  },
  permalink: String,
  crunchbase_url: String,
  homepage_url: String,
  blog_url: String,
  blog_feed_url: String,
  twitter_username: String,
  category_code: String,
  number_of_employees: Number,
  founded_year: Number,
  founded_month: Number,
  founded_day: Number,
  deadpooled_year: Number,
  tag_list: String,
  alias_list: String,
  email_address: String,
  phone_number: String,
  description: String,
  created_at: Date,
  updated_at: String,
  overview: String,
  image: {
    type: Object
  },
  products: {
    type: Array
  },
  relationships: {
    type: Array
  }
});

const Company = mongoose.model('Company', companySchema);

export default Company;




