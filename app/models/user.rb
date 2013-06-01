# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  password   :string(255)
#  email      :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ActiveRecord::Base

  attr_accessible :email, :name, :password

  has_many :issues

  CHARS_AND_NUMS = /^[a-zA-Z0-9\s]*$/

  validates :email, :presence => true
  validates :name, :presence => true, :format => {:with => CHARS_AND_NUMS}
  validates :password, :presence => true

end
