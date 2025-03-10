import sys 
print(sys.version)
print("\n")

print(sys.executable)

def greet(who_to_greet):
    greeting = 'hello, {}'.format(who_to_greet)
    return greeting


print("Hello world!")

print(greet('world'))
print(greet('corey'))



