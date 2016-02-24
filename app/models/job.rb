class Job < ActiveRecord::Base
  validates :client_id, :date, :test_id, presence: true

  belongs_to: :client,
    foreign_key: :client_id,
    class_name: :user
end
