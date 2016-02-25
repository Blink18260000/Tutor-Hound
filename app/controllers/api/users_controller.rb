class Api::UsersController < ApplicationController
  def index
    @user = current_user
    render :show
  end

  def update
    @user = current_user

    @user.update(user_params)
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:password, :region_id, :address, :phone_number)
  end
end
