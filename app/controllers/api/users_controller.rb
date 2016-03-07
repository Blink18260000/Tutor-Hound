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

  def add_photo
    @user = current_user

    @user.update(url: params[:url])
    render :show
  end

  def destroy
    @user = current_user
    unless @user.id == 1
      @user.destroy!
    end
    render nothing: true
  end

  private
  def user_params
    params.require(:user).permit(:password, :region_id, :address, :phone_number)
  end
end
