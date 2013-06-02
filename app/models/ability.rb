class Ability
  include CanCan::Ability

  def initialize( user )
    user ||= User.new( :role => "visitor" )
    case user.role
    when "user"
      can :show, User
#      cannot :index, Issue
    when "local"
      can :local, Issue
    when "global"
      can :manage, :all
    end
  end
end
