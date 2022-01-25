from django.db import models


# Create your models here.
class Products(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length=50)
    desc = models.CharField(max_length=300)
    pub_date = models.DateField()
    category = models.CharField(max_length=50, default="")
    subcategory = models.CharField(max_length=50, default="")
    price = models.IntegerField(default=0)
    image = models.ImageField(upload_to='shop/images', default="")

    # image1 = image = models.ImageField(upload_to='shop/images', default="")

    def __str__(self):
        return self.product_name


class Cart(models.Model):
    product_id = models.CharField(max_length=50, default=0)
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.product_id