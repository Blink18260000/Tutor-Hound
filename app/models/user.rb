class User < ActiveRecord::Base
  validates :user_name, uniqueness: {message: "Username is already taken"}
  validates :user_name, :password_digest, :session_token, :region_id, :address, :phone_number, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token

  belongs_to :region

  has_one :tutor

  has_many :quals,
    through: :tutor,
    source: :quals

  has_many :tests,
    through: :quals,
    source: :test

  has_many :available_jobs,
    through: :tests,
    source: :jobs

  has_many :jobs,
    foreign_key: :client_id

  def self.find_by_credentials(user_name, password)
    user = User.find_by(user_name: user_name)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
