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

  # before create generate a cookie token
  before_save :create_token

  has_many :issues
  has_secure_password

  CHARS_AND_NUMS = /^[a-zA-Z0-9\s]*$/

  validates :email, :presence => true
  validates :name, :presence => true, :format => {:with => CHARS_AND_NUMS}
  validates_presence_of :password, :on => :create

  private

  def create_token
    self.token = SecureRandom.urlsafe_base64
  end

end
