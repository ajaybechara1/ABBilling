from django.db import models
from django.utils import timezone

# CustomerCompanyDetail, TruckDetail, ContainerDetail, CityDetail, PackageDetail, LRNumberDetail, BillDetail

class CustomerCompanyDetail(models.Model):
	company_name = models.TextField(max_length = 100)

	def __str__(self):
		return str(self.company_name)


class TruckDetail(models.Model):
	truck_number = models.TextField(max_length = 20)

	def __str__(self):
		return str(self.truck_number)


class CityDetail(models.Model):
	city_name = models.TextField(max_length = 50)

	def __str__(self):
		return str(self.city_name)


class PackageDetail(models.Model):
	package_size = models.TextField(max_length = 10)

	def __str__(self):
		return str(self.package_size)


class OrderType(models.Model):
	order_type = models.TextField(max_length = 10)

	def __str__(self):
		return str(self.order_type)


class DummyModel(models.Model):
	dummy_data = models.TextField(max_length = 50000)


class BillDetail(models.Model):

	date = models.DateField(default=timezone.now)

	order_date = models.DateField(default=timezone.now)

	company_name = models.ForeignKey(CustomerCompanyDetail, on_delete=models.SET_NULL, related_name='F', null=True)
	truck_number = models.ForeignKey(TruckDetail, on_delete=models.SET_NULL, related_name='A', null=True)
	package_size = models.ForeignKey(PackageDetail, on_delete=models.SET_NULL, related_name='E', null=True)
	city_from = models.ForeignKey(CityDetail, on_delete=models.SET_NULL, related_name='C', null=True)
	city_to = models.ForeignKey(CityDetail, on_delete=models.SET_NULL, related_name='D', null=True)
	order_type = models.ForeignKey(OrderType, on_delete=models.SET_NULL, related_name='H', null=True)

	container_number = models.TextField(max_length = 50, default="NILL", blank=True)
	lr_number = models.TextField(max_length = 50, default="NILL", blank=True)

	freight = models.FloatField(default=0)
	overload = models.FloatField(default=0) # extra rate + 
	liftoff = models.FloatField(default=0)  # container charge + 
	advanced = models.FloatField(default=0) # company e aapel kharcho -
	diesel = models.FloatField(default=0)   # company e aapel diesel kharcho -
	tds = models.FloatField(default=0)
	balance = models.FloatField(default=0)  # freight + overload + liftoff - advanced - diesel - tds
	
	def __str__(self):
		return str(self.company_name)
