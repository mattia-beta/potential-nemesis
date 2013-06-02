class Ability
  include CanCan::Ability

  def initialize( user )
    user ||= User.new( :role => "visitor" )
    case user.role
      when "user"
      can :manage, Issue
      can :manage, User
      cannot :index, Issue
      cannot :local, :index
      when "local"
      can :manage, Issue
      can :manage, User
      cannot :show, User
      when "global"
      can :manage, :all
    end
  end
end
