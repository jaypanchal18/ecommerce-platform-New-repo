from django.urls import path, include
from rest_framework.routers import DefaultRouter
from base.views import product_views as views



# Initialize the router
router = DefaultRouter()


urlpatterns = [
    path('', views.getProducts, name="products"),
    path('create/', views.createProduct, name="create_product"),
    path('upload/', views.uploadImage, name="upload_image"),
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('top/', views.getTopProducts, name="top-products"),
    path('<str:pk>/', views.getProduct, name="product"),
    path('update/<str:pk>/', views.updateProduct, name="update_product"),
    path('delete/<str:pk>/', views.deleteProduct, name="delete_product"),
    path('', include(router.urls)),
]
