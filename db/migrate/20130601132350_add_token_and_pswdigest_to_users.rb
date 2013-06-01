class AddTokenAndPswdigestToUsers < ActiveRecord::Migration
  def change
    add_column :users, :token, :string
    add_column :users, :password_digest, :string
  end
end
