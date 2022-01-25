from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import Products, Cart
from math import ceil
from django.views.decorators.csrf import csrf_protect
import json


# Create your views here.
def index(request):
    allProducts = []
    catagory_products = Products.objects.values('category', 'id')
    catagories = {item['category'] for item in catagory_products}
    for catagory_ in catagories:
        product = Products.objects.filter(category=catagory_)
        n = len(product)
        no_of_slides = n // 4 - ceil(n / 4 - n // 4)
        allProducts.append([product, range(1, no_of_slides), no_of_slides])

    params = {'allProds': allProducts}
    # products = Products.objects.all()
    # print(products)
    # n = len(products)
    # no_slides = n//4 - ceil(n/4 - n//4)
    # params = {'no_of_slides': no_slides, 'range': range(1, no_slides), 'product': products}
    return render(request, 'shop/index.html', params)


@csrf_protect
def view_cart(request):
    local_storage = request.GET.get('localstorage')
    count = request.GET.get('count')
    # print(local_storage[2:]) output:- 12/1/15/... i.e product id
    present = Cart.objects.filter(product_id=local_storage[2:])
    if present:
        c = Cart.objects.get(product_id=local_storage[2:])
        c.count = int(count)
    else:
        c = Cart(product_id=local_storage[2:], count=int(count))
    c.save()
    return HttpResponse(status=200)



def view_cart_page(request):
    cart_products = Cart.objects.all()
    lists = []
    sum_of_price = 0
    total_products = 0
    for i in cart_products:
        # print(i.count)
        p = Products.objects.filter(id=i.product_id)
        # print('>>>>>>>>>>', p.values_list()[0][6] * i.count)
        # print(p.price)
        # p.values_list()[0][-2] = p.values_list()[0][-2] * i.count
        # p.save()
        lists.append([p, i.count])
        sum_of_price = sum_of_price + p.values_list()[0][6] * i.count
        # sum_of_price = sum_of_price + p.price * i.count

        total_products += i.count


    params = {'cart_products': lists, 'sum': sum_of_price, 'total_products': total_products}
    # field_name = 'product_id'
    # obj = Cart.objects.first()
    # field_value = getattr(obj, field_name)
    # print('>>>>>>>>>>',field_value)
    return render(request, 'shop/cart.html', params)

def view__more__products(request, category):
    products = Products.objects.filter(category=category)
    return render(request, 'shop/products.html', {'products': products})


def update_cart(request, product_id):
    name = product_id.split('_')

    prod = Cart.objects.get(product_id=name[1])
    # print(prod.count)
    # print(prod.__dict__)
    if name[0] == 'plus' or name[0] == 'minus':
        if name[0] == 'plus':
            prod.count = prod.count + 1
        elif name[0] == 'minus':
            prod.count = prod.count - 1
        prod.save()
    elif name[0] == 'remove':
        prod.delete()

    # return view_cart_page(request)
    return redirect('/shop/view_cart')
