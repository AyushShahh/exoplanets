from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth import authenticate, login as auth_login, logout

from .models import User, Blog, Category


def index(request):
    return render(request, 'exoplanets/index.html')


def login(request):
    if request.user.is_authenticated:
        return redirect(reverse('home'))

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)

        if user is None:
            return render(request, 'exoplanets/auth.html', {
                'auth': 'login',
                'message': 'Invalid username or password'
            })

        auth_login(request, user)
        return redirect(reverse('home'))

    return render(request, 'exoplanets/auth.html', {
        'auth': 'login'
    })


def signup(request):
    if request.user.is_authenticated:
        return redirect(reverse('home'))

    if request.method == 'POST':
        first_name = request.POST['first']
        last_name = request.POST['last']
        grade = int(request.POST['grade'])
        city = request.POST['city']
        country = request.POST['country']
        username  = request.POST['username']
        password = request.POST['password']
        confirmation = request.POST['confirm']

        if password != confirmation:
            return render(request, 'exoplanets/auth.html', {
                'auth': 'signup',
                'message': 'Passwords do not match'
            })
        try:
            user = User.objects.create_user(
                first_name=first_name,
                last_name=last_name,
                city=city,
                country=country,
                username=username,
                password=password,
                grade=grade
            )
            user.save()
            auth_login(request, user)
            return redirect(reverse('home'))
        except Exception as e:
            return render(request, 'exoplanets/auth.html', {
                'auth': 'signup',
                'message': str(e)
            })

    return render(request, 'exoplanets/auth.html', {
        'auth': 'signup'
    })


def home(request):
    if not request.user.is_authenticated:
        return redirect(reverse('login'))
    return render(request, 'exoplanets/home.html')


def profile(request, username):
    try:
        user = User.objects.get(username=username)
    except:
        return redirect(reverse('home'))

    return render(request, 'exoplanets/profile.html', {
        'user': user
    })


def blogs(request, category=None):
    if not request.user.is_authenticated:
        return redirect(reverse('login'))

    if request.method == 'POST':
        category = request.POST.get('category', '')
        if not category:
            return render(request, 'exoplanets/blogs.html', {
                'blogs': Blog.objects.all().order_by('-timestamp'),
                'categories': Category.objects.all() ,
                'message': 'Choose a category',
                'c': category
            })
        body = request.POST['body']
        blog = Blog.objects.create(body=body, category=Category.objects.get(id=category), user=request.user)
        blog.save()

    return render(request, 'exoplanets/blogs.html', {
        'blogs': Blog.objects.all().order_by('-timestamp'),
        'categories': Category.objects.all(),
        'c': category
    })


def v(request):
    return render(request, 'exoplanets/visualization.html')
