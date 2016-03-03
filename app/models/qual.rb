class Qual < ActiveRecord::Base
  validates :test_id, :tutor_id, presence: true
  validates :test_id, uniqueness: { scope: :tutor_id, message: "This tutor is already qualified for this test."}

  belongs_to :tutor,
    dependent: :destroy

  belongs_to :test,
    dependent: :destroy
end
