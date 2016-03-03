class Test < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :quals

  has_many :tutors,
    through: :quals,
    source: :tutor

  has_many :jobs
end
