
name = "Tom"

print(type(True)) # <class 'bool'>
print(type("str")) # <class 'str'>
print(type(123)) # <class 'int'>
print(type(123.6)) # <class 'float'>
print(type([1, 2, 3, 4, 5])) # <class 'list'>
print(type(("Tom", 23))) # <class 'tuple'>
print(type({1: "Tom", 2: "Bob", 3: "Bill"})) # <class 'dict'> , объект
print(type({"Tom","Bob","Alice", "Tom"})) # <class 'set'> , множество


d = 20
if d >= 21:
    print("Число больше или равно 21")
elif d >= 36:
   print("Число больше или равно 36")
else:
    print("Число меньше 21")