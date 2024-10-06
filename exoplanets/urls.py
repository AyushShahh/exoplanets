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
    path('v', views.v),
    path('quiz', views.quiz,name='quiz')
]
