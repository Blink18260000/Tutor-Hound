class Api::TestsController < ApplicationController
  def index
    @tests = Test.all
  end
end
