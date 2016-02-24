class Region < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :users

  has_many :tutors,
    through: :users,
    source: :tutor
end
