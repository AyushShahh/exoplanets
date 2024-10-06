from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name="index"),
    path('login', views.login, name="login"),
    path('signup', views.signup, name='signup'),
    path('home', views.home, name='home'),
    path('profile/<str:username>', views.profile, name='profile'),
    path('blogs', views.blogs, name='blogs'),
    path('blogs/<str:category>', views.blogs, name='blog'),
    path('storytelling', views.story, name="story"),
    path('visualization', views.visualization, name="visualization"),
    path('logout', views.logout, name="logout"),
    path('exoplanets/types', views.types, name="types"),
    path('how-to-find', views.find, name="find"),
    path('games', views.games, name="games")
]
