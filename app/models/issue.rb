class Issue < ActiveRecord::Base
  belongs_to :user
  attr_accessible :description, :genre, :image, :location, :name, :priority
end
