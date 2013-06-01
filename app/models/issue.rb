# == Schema Information
#
# Table name: issues
#
#  id          :integer          not null, primary key
#  name        :string(255)
#  description :text
#  priority    :integer
#  image       :string(255)
#  location    :string(255)
#  genre       :string(255)
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Issue < ActiveRecord::Base

  belongs_to :user
  attr_accessible :description, :genre, :image, :location, :name, :priority

  validates_presence_of :name, :description, :location
  

end
