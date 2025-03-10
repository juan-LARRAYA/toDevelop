import math
import tkinter as tk
from tkinter import messagebox

class ScientificCalculator:
    def __init__(self):
        pass

    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

    def multiply(self, a, b):
        return a * b

    def divide(self, a, b):
        if b == 0:
            raise ValueError("Cannot divide by zero.")
        return a / b

    def power(self, a, b):
        return math.pow(a, b)

    def sqrt(self, a):
        if a < 0:
            raise ValueError("Cannot take the square root of a negative number.")
        return math.sqrt(a)

    def sin(self, a):
        return math.sin(a)

    def cos(self, a):
        return math.cos(a)

    def tan(self, a):
        return math.tan(a)

    def log(self, a, base=math.e):
        if a <= 0:
            raise ValueError("Logarithm undefined for non-positive values.")
        return math.log(a, base)

    def factorial(self, a):
        if a < 0 or not isinstance(a, int):
            raise ValueError("Factorial is only defined for non-negative integers.")
        return math.factorial(a)
class CalculatorGUI:
    def __init__(self, root):
        self.calculator = ScientificCalculator()
        self.root = root
        self.root.title("Scientific Calculator")

        self.entry = tk.Entry(root, width=40, borderwidth=5, bg="lightyellow")
        self.entry.grid(row=0, column=0, columnspan=5)

        self.create_buttons()

    def create_buttons(self):
        buttons = [
            ('7', 1, 0), ('8', 1, 1), ('9', 1, 2), ('/', 1, 3),
            ('4', 2, 0), ('5', 2, 1), ('6', 2, 2), ('*', 2, 3),
            ('1', 3, 0), ('2', 3, 1), ('3', 3, 2), ('-', 3, 3),
            ('0', 4, 0), ('.', 4, 1), ('+', 4, 2), ('=', 4, 3),
            ('sqrt', 5, 0), ('^', 5, 1), ('sin(', 5, 2), ('cos(', 5, 3),
            ('tan(', 6, 0), ('log(', 6, 1), ('!', 6, 2), ('C', 6, 3),
            ('Shift', 7, 0), ('Del', 7, 1)
        ]

        for (text, row, col) in buttons:
            button = tk.Button(self.root, text=text, padx=20, pady=20, bg="lightblue", command=lambda t=text: self.on_button_click(t))
            button.grid(row=row, column=col)

    def on_button_click(self, char):
        if char == '=':
            self.calculate()
        elif char == 'C':
            self.entry.delete(0, tk.END)
        elif char == 'Del':
            current_text = self.entry.get()
            self.entry.delete(0, tk.END)
            self.entry.insert(0, current_text[:-1])
        elif char == 'Shift':
            self.shift_mode()
        else:
            self.entry.insert(tk.END, char)

    def shift_mode(self):
        buttons = [
            ('asin(', 1, 0), ('acos(', 1, 1), ('atan(', 1, 2), ('exp(', 1, 3),
            ('sinh(', 2, 0), ('cosh(', 2, 1), ('tanh(', 2, 2), ('pi', 2, 3),
            ('e', 3, 0), ('(', 3, 1), (')', 3, 2), ('%', 3, 3)
        ]

        for (text, row, col) in buttons:
            button = tk.Button(self.root, text=text, padx=20, pady=20, bg="lightgreen", command=lambda t=text: self.on_button_click(t))
            button.grid(row=row, column=col)

    def calculate(self):
        try:
            expression = self.entry.get()
            if 'sqrt' in expression:
                expression = expression.replace('sqrt', 'self.calculator.sqrt')
            if '^' in expression:
                expression = expression.replace('^', '**')
            if 'sin(' in expression:
                expression = expression.replace('sin(', 'self.calculator.sin(')
            if 'cos(' in expression:
                expression = expression.replace('cos(', 'self.calculator.cos(')
            if 'tan(' in expression:
                expression = expression.replace('tan(', 'self.calculator.tan(')
            if 'log(' in expression:
                expression = expression.replace('log(', 'self.calculator.log(')
            if '!' in expression:
                expression = expression.replace('!', '')
                expression = f'self.calculator.factorial({expression})'
            result = eval(expression)
            self.entry.delete(0, tk.END)
            self.entry.insert(0, str(result))
        except Exception as e:
            messagebox.showerror("Error", str(e))

if __name__ == "__main__":
    root = tk.Tk()
    calculator_gui = CalculatorGUI(root)
    root.mainloop()
