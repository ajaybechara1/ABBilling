# Generated by Django 3.1.2 on 2020-10-15 17:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20201015_1659'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dummymodel',
            old_name='order_type',
            new_name='dummy_data',
        ),
    ]
