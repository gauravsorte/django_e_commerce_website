from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cart/', views.view_cart, name="view_cart"),
    path('view_cart/', views.view_cart_page, name="view_cart_page"),
    path('view_products/<str:category>', views.view__more__products, name="view__products"),
    path('update_cart/<str:product_id>', views.update_cart, name="update_cart"),
]