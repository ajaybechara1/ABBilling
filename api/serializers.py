from rest_framework import serializers
from .models import CustomerCompanyDetail, TruckDetail, CityDetail, PackageDetail, BillDetail, OrderType


class CustomerCompanyDetailSerializer(serializers.HyperlinkedModelSerializer):
	id = serializers.IntegerField(read_only=True)
	class Meta:
		model = CustomerCompanyDetail
		fields = '__all__'

class TruckDetailSerializer(serializers.HyperlinkedModelSerializer):
	id = serializers.IntegerField(read_only=True)
	class Meta:
		model = TruckDetail
		fields = '__all__'

class CityDetailSerializer(serializers.HyperlinkedModelSerializer):
	id = serializers.IntegerField(read_only=True)
	class Meta:
		model = CityDetail
		fields = '__all__'

class PackageDetailSerializer(serializers.HyperlinkedModelSerializer):
	id = serializers.IntegerField(read_only=True)
	class Meta:
		model = PackageDetail
		fields = '__all__'

class OrderTypeSerializer(serializers.HyperlinkedModelSerializer):
	id = serializers.IntegerField(read_only=True)
	class Meta:
		model = OrderType
		fields = '__all__'

class BillDetailSerializer(serializers.HyperlinkedModelSerializer):
	id = serializers.IntegerField(read_only=True)
	class Meta:
		model = BillDetail
		fields = '__all__'
