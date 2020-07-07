class PagesController < ApplicationController
  def home
    if current_user
      if current_user.executive?
        redirect_to desktop_users_path
      end
    else
      redirect_to new_user_session_path
    end
  end
end
