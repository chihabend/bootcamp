from menu_item import MenuItem
from menu_manager import MenuManager

def show_user_menu():
    while True:
        print("\nMenu Options:")
        print("(V) View an item")
        print("(A) Add an item")
        print("(D) Delete an item")
        print("(U) Update an item")
        print("(S) Show full menu")
        print("(X) Exit")

        choice = input("Enter your choice: ").upper()

        if choice == 'V':
            name = input("Enter item name to view: ")
            item = MenuManager.get_by_name(name)
            print(item if item else "Item not found.")
        elif choice == 'A':
            add_item_to_menu()
        elif choice == 'D':
            remove_item_from_menu()
        elif choice == 'U':
            update_item_from_menu()
        elif choice == 'S':
            show_restaurant_menu()
        elif choice == 'X':
            show_restaurant_menu()
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Try again.")

def add_item_to_menu():
    name = input("Enter item name: ")
    try:
        price = int(input("Enter item price: "))
        item = MenuItem(name, price)
        item.save()
    except ValueError:
        print("Invalid price input.")

def remove_item_from_menu():
    name = input("Enter item name to delete: ")
    item = MenuItem(name, 0)
    item.delete()

def update_item_from_menu():
    name = input("Enter current item name: ")
    try:
        price = int(input("Enter current item price: "))
        new_name = input("Enter new name: ")
        new_price = int(input("Enter new price: "))
        item = MenuItem(name, price)
        item.update(new_name, new_price)
    except ValueError:
        print("Invalid input for price.")

def show_restaurant_menu():
    items = MenuManager.all_items()
    print("\n--- Restaurant Menu ---")
    for item in items:
        print(f"{item['item_name']} - ${item['item_price']}")
    print("------------------------")


if __name__ == '__main__':
    show_user_menu()
