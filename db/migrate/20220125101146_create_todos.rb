class CreateTodos < ActiveRecord::Migration[7.0]
  def change
    create_table :todos do |t|
      t.string :title
      t.boolean :done
      t.string :tag

      t.timestamps
    end
  end
end
