class Tutor < ActiveRecord::Base
  validates :f_name, :l_name, presence: true
  validates :user_id, presence: true, uniqueness: {message: "This user is already a registed tutor"}

  belongs_to :user

  has_one :region,
    through: :user,
    source: :region

  has_many :jobs

  has_many :quals
end
