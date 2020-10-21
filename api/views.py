from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import CustomerCompanyDetailSerializer, TruckDetailSerializer, CityDetailSerializer, PackageDetailSerializer, OrderTypeSerializer, BillDetailSerializer
from .models import CustomerCompanyDetail, TruckDetail, CityDetail, PackageDetail, OrderType, BillDetail, DummyModel

from django.views.decorators.csrf import csrf_exempt
import sys
import datetime

import time

global_dictionary = "None" 

class CustomerCompanyDetailView(viewsets.ModelViewSet):
	serializer_class = CustomerCompanyDetailSerializer
	queryset = CustomerCompanyDetail.objects.all()

class TruckDetailView(viewsets.ModelViewSet):
	serializer_class = TruckDetailSerializer
	queryset = TruckDetail.objects.all()

class CityDetailView(viewsets.ModelViewSet):
	serializer_class = CityDetailSerializer
	queryset = CityDetail.objects.all()

class PackageDetailView(viewsets.ModelViewSet):
	serializer_class = PackageDetailSerializer
	queryset = PackageDetail.objects.all()

class OrderTypeView(viewsets.ModelViewSet):
	serializer_class = OrderTypeSerializer
	queryset = OrderType.objects.all()

class BillDetailView(viewsets.ModelViewSet):
	serializer_class = BillDetailSerializer
	queryset = BillDetail.objects.all()

@api_view(['POST'])
def AddNewOrder(request):
	try:
		data = request.data

		print('\n\n\n\n', data, '\n\n\n\n')

		pk = data['company_name'][:-1].split('/')[-1]
		company_name = CustomerCompanyDetail.objects.get(id=int(pk))

		pk = data['truck_number'][:-1].split('/')[-1]
		truck_number = TruckDetail.objects.get(id=pk)

		pk = data['package_size'][:-1].split('/')[-1]
		package_size = PackageDetail.objects.get(id=pk)

		pk = data['city_from'][:-1].split('/')[-1]
		city_from = CityDetail.objects.get(id=pk)

		pk = data['city_to'][:-1].split('/')[-1]
		city_to = CityDetail.objects.get(id=pk)

		pk = data['order_type'][:-1].split('/')[-1]
		order_type = OrderType.objects.get(id=pk)


		BillDetail.objects.create(
				order_date = data['order_date'],
				company_name = company_name,
				truck_number = truck_number,
				package_size = package_size,
				city_from = city_from,
				city_to = city_to,
				order_type = order_type,
				container_number = data['container_number'],
				lr_number = data['lr_number'],
				freight = data['freight'],
				overload = data['overload'],
				liftoff = data['liftoff'],
				advanced = data['advanced'],
				diesel = data['diesel'],
				balance = data['balance'],
			)
		return Response({}, status=status.HTTP_201_CREATED)
	except Exception as e:
		exc_type, exc_obj, exc_tb = sys.exc_info()
		print(str(e), str(exc_tb.tb_lineno))
		return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def AddNewOrder2(request):
	data = request.data
	serializer = BillDetailSerializer(data=data)
	if serializer.is_valid():
		print(serializer.validated_data)
		return Response(serializer.data, status=status.HTTP_201_CREATED)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def FilterOrder(request):
	try:
		data = request.data

		print('\n\n\n\n', data, '\n\n\n\n')

		company_list = []
		for company_url in data['company_name']:
			pk = company_url[:-1].split('/')[-1]
			company_obj = CustomerCompanyDetail.objects.get(id=int(pk))
			company_list.append( company_obj )

		if not company_list:
			company_list = list(CustomerCompanyDetail.objects.all())

		truck_list = []
		for truck_url in data['truck_number']:
			pk = truck_url[:-1].split('/')[-1]
			truck_obj = TruckDetail.objects.get(id=int(pk))
			truck_list.append( truck_obj )

		if not truck_list:
			truck_list = list(TruckDetail.objects.all())

		package_list = []
		for package_url in data["package_size"]:
			pk = package_url[:-1].split('/')[-1]
			package_obj = PackageDetail.objects.get(id=int(pk))
			package_list.append( package_obj )

		if not package_list:
			package_list = list(PackageDetail.objects.all())

		city_from_list = []
		for city_from_url in data["city_from"]:
			pk = city_from_url[:-1].split('/')[-1]
			city_from_obj = CityDetail.objects.get(id=int(pk))
			city_from_list.append( city_from_obj )

		if not city_from_list:
			city_from_list = list(CityDetail.objects.all())

		city_to_list = []
		for city_to_url in data["city_to"]:
			pk = city_to_url[:-1].split('/')[-1]
			city_to_obj = CityDetail.objects.get(id=int(pk))
			city_to_list.append( city_to_obj )

		if not city_to_list:
			city_to_list = list(CityDetail.objects.all())

		order_list = []
		for order_url in data["order_type"]:
			pk = order_url[:-1].split('/')[-1]
			order_obj = OrderType.objects.get(id=int(pk))
			order_list.append( order_obj )

		if not order_list:
			order_list = list(OrderType.objects.all())

		date_from = data["date_from"]
		date_to = data["date_to"]

		date_format = "%Y-%m-%d"
		datetime_start = datetime.datetime.strptime(
			date_from, date_format).date()
		datetime_end = datetime.datetime.strptime(date_to, date_format).date()  # noqa: F841

		order_list = BillDetail.objects.filter(
				order_date__gte=datetime_start,
				order_date__lte=datetime_end,
				company_name__in=company_list,
				truck_number__in=truck_list,
				package_size__in=package_list,
				city_from__in=city_from_list,
				city_to__in=city_to_list,
				order_type__in=order_list
			)

		order_list = list(order_list)

		print(len(order_list))
		response_order_list = []

		for order_obj in order_list:
			res_obj = {}
			res_obj['id'] = order_obj.id
			res_obj['company_name'] = order_obj.company_name.company_name
			res_obj['truck_number'] = order_obj.truck_number.truck_number
			res_obj['package_size'] = order_obj.package_size.package_size
			res_obj['city_from'] = order_obj.city_from.city_name
			res_obj['city_to'] = order_obj.city_to.city_name
			res_obj['order_type'] = order_obj.order_type.order_type
			res_obj['container_number'] = order_obj.container_number
			res_obj['lr_number'] = order_obj.lr_number
			res_obj['freight'] = order_obj.freight
			res_obj['overload'] = order_obj.overload
			res_obj['liftoff'] = order_obj.liftoff
			res_obj['advanced'] = order_obj.advanced
			res_obj['diesel'] = order_obj.diesel
			res_obj['tds'] = order_obj.tds
			res_obj['balance'] = order_obj.balance
			res_obj['order_date'] = str(order_obj.order_date)
			response_order_list.append(res_obj)

		
		response = {
			"status" : 200,
			"order_list": response_order_list
		}

		return Response(response, status=status.HTTP_201_CREATED)
	except Exception as e:
		exc_type, exc_obj, exc_tb = sys.exc_info()
		print(str(e), str(exc_tb.tb_lineno))
		return Response({}, status=status.HTTP_400_BAD_REQUEST)


# 737

@api_view(['GET'])
def dummy_request(request):

	global global_dictionary
	global_dictionary = "AJAY"
	# bill_obj = BillDetail.objects.all()[0]
	# start = time.time()
	
	# dummy_model_objs = bill_obj.dummy_model.all()
	# print('\n\n\n', dummy_model_objs)

	# end = time.time()
	
	# total = str(end - start)

	# start = time.time()
	
	# for i in range(1,737):
	# 	dummy_model_objs = DummyModel.objects.get(pk=i)

	# end = time.time()

	# total += ( "  " +  str( end-start ) )

	return Response(global_dictionary)


@api_view(['GET'])
def dummy_request2(request):

	global global_dictionary
	# global_dictionary = "AJAY"
	# bill_obj = BillDetail.objects.all()[0]
	# start = time.time()
	
	# dummy_model_objs = bill_obj.dummy_model.all()
	# print('\n\n\n', dummy_model_objs)

	# end = time.time()
	
	# total = str(end - start)

	# start = time.time()
	
	# for i in range(1,737):
	# 	dummy_model_objs = DummyModel.objects.get(pk=i)

	# end = time.time()

	# total += ( "  " +  str( end-start ) )

	return Response(global_dictionary)
