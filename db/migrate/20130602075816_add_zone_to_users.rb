class AddZoneToUsers < ActiveRecord::Migration
  def change
    add_column :users, :zone, :string
  end
end
