
#!/bin/bash

# Function to check if a command exists
check_command() {
    command -v "$1" >/dev/null 2>&1
}

# Check Python
if check_command python3; then
    echo "Python 3 is installed:"
    python3 --version
elif check_command python; then
    echo "Python is installed:"
    python --version
else
    echo "Python is NOT installed. Please install Python 3."
fi

# Check pip
if check_command pip3; then
    echo "pip3 is installed:"
    pip3 --version
elif check_command pip; then
    echo "pip is installed:"
    pip --version
else
    echo "pip is NOT installed. Please install pip."
fi

# Check git
if check_command git; then
    echo "Git is installed:"
    git --version
else
    echo "Git is NOT installed. Please install git."
fi

# Check Node.js
if check_command node; then
    echo "Node.js is installed:"
    node --version
else
    echo "Node.js is NOT installed. Please install Node.js."
fi

# Check npm
if check_command npm; then
    echo "npm is installed:"
    npm --version
else
    echo "npm is NOT installed. Please install npm."
fi
