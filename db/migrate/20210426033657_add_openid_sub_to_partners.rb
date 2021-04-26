class AddOpenidSubToPartners < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :openid_sub, :string
  end
end
