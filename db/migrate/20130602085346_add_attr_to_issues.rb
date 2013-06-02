class AddAttrToIssues < ActiveRecord::Migration
  def change
    add_column :issues, :comment, :text
    add_column :issues, :done, :bool, :default => false
  end
end
