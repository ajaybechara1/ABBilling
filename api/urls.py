from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('billdetail', views.BillDetailView)
router.register('customercompanydetail', views.CustomerCompanyDetailView)
router.register('truckdetail', views.TruckDetailView)
router.register('citydetail', views.CityDetailView)
router.register('packagedetail', views.PackageDetailView)
router.register('ordertype', views.OrderTypeView)

urlpatterns = [
	path('add-new-order/', views.AddNewOrder),
	path('filter-order/', views.FilterOrder),
	path('generate-bill/', views.GenerateBill),
	path('dummy_request/', views.dummy_request),
	path('dummy_request2/', views.dummy_request2),
	path('', include(router.urls))
]
