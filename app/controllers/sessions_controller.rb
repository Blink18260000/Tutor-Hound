class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:user_name],
      params[:user][:password]
    )
    if @user
      sign_in(@user)
      redirect_to app_url
    else
      flash.now[:errors] = ["Invalid login"]
      render :new
    end
  end

  def destroy
    sign_out
    render nothing: true
  end
end
