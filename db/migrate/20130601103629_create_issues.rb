class CreateIssues < ActiveRecord::Migration
  def change
    create_table :issues do |t|
      t.string :name
      t.text :description
      t.integer :priority
      t.string :image
      t.string :location
      t.string :genre
      t.references :user

      t.timestamps
    end
    add_index :issues, :user_id
  end
end
