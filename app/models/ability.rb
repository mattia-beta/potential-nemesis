class Ability
  include CanCan::Ability

  def initialize( user )
    user ||= User.new( :role => "visitor" )
    case user.role
      when "user"
      can :manage, Issue
      can :manage, User
      cannot :index, Issue
      cannot :local, Issue
      when "local"
      can :manage, Issue
      can :manage, User
      cannot :show, User
      cannot :index, Issue
      when "global"
      can :manage, Issue
      can :manage, User
      cannot :show, User
      cannot :local, Issue
    end
  end
end
