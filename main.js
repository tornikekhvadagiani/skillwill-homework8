// ● დაწერე ფუნქცია expo, რომელიც იქნება
// რეკურსიული ფუნქცია და მიიღებს
// არგუმენტად:

// ● ა) ციფრს ბ) ხარისხს და გ) callback - ს და
// დააბრუნებს მიღებული ციფრის ხარისხს
// მაგალითად: 5 ხარისხად 3 - არის 125 (5 * 5
// *5)
function expo(number, power, callback) {
  if (power === 0) {
    return callback(1);
  }
  return callback(number * expo(number, power - 1, callback));
}

let a = expo(5, 3, (result) => result);
console.log(a);

// ● fetch ფუნქციის გამოყენებით წამოიღე
// მონაცემები მოცემული მისამართიდან და
// გამოიტანე DOM-ში პოსტის სახით

// function, რომელიც ქმნის HTML ელემენტებს
// function, რომელიც ქმნის HTML ელემენტებს

function userCard(userId, id, title, body) {
  const div = document.createElement("div");
  div.classList.add("card");

  // userId
  const userIdElement = document.createElement("p");
  userIdElement.textContent = `User ID: ${userId}`;
  div.appendChild(userIdElement);

  // id
  const idElement = document.createElement("p");
  idElement.textContent = `ID: ${id}`;
  div.appendChild(idElement);

  // title
  const titleElement = document.createElement("h3");
  titleElement.textContent = title;
  div.appendChild(titleElement);

  // body
  const bodyElement = document.createElement("p");
  bodyElement.textContent = body;
  div.appendChild(bodyElement);

  return div;
}

async function fetchData() {
  try {
    const rawData = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!rawData.ok) {
      throw Error("not good request");
    }
    const data = await rawData.json();
    data.forEach((u) => {
      const user = userCard(u.userId, u.id, u.title, u.body);
      document.body.appendChild(user);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();

// ● დაწერე ასინქრონული ფუნქცია, რომელიც
// არგუმენტად იღებს ობიექტს და აკეთებს
// deep copy-ს
// ● ფუნქციამ უნდა გამოიძახოს reject თუ
// არგუმენტი არ არის ობიექტი. თუ
// ყველაფერი კარგად არის, გამოიძახოს
// resolve კოპირებული ობიექტით

function deepCopy(obj) {
  return new Promise((resolve, reject) => {
    if (typeof obj !== "object" || obj === null) {
      return reject("Argument is not an object");
    }

    const copy = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] =
          typeof obj[key] === "object" && obj[key] !== null
            ? deepCopy(obj[key])
            : obj[key];
      }
    }

    resolve(copy);
  });
}

const originalObject = {
  user: "John",
  address: {
    street: "Main St",
    city: "New York",
  },
  hobbies: ["reading", "coding"],
};

deepCopy(originalObject)
  .then((copiedObject) => {
    console.log("Original:", originalObject);
    console.log("Copied:", copiedObject);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
