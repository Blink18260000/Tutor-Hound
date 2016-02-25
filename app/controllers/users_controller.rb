class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      redirect_to app_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def guest
    @user = User.find_by_credentials("MRice", "starwars")
    redirect_to app_url
  end

  private
  def user_params
    params.require(:user).permit(:password, :user_name, :region_id, :address, :phone_number)
  end
end
