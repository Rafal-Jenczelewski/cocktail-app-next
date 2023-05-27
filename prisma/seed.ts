import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const email = "admin@admin.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();

  //FIXME
  const hashedPassword = "TMP";

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const ingredients = await addAllIngredientsForLongIsland();
  await prisma.recipe.create({
    data: {
      ingredients: { connect: ingredients },
      name: "Long Island Ice Tea",
      body: "Wszystkie składniki wrzucić do shakera z lodem\nWymieszać, lać do szklanki bez sitka, dodać coli.",
    },
  });

  await Promise.all(
    [
      "Ciemny rum",
      "Pasoa",
      "Wino musujące",
      "Woda gazowana",
      "Sprite",
      "Jagermaister",
      "Grenadyna",
      "Likier brzoskwiniowy",
      "Likier czekoladowy",
      "Malibu",
      "Bitters",
      "Truskawki",
      "Cukier",
      "Syrop Waniliowy",
      "Brandy",
      "Kahula",
      "Vermouth"
    ].map((name) =>
      prisma.ingredient.create({ data: { name, available: false } })
    )
  );

  console.log(`Database has been seeded. 🌱`);
}

async function addAllIngredientsForLongIsland() {
  const ingredients = await Promise.all(
    ["Wódka", "Triple Sec", "Tequila", "Jasny rum", "Gin"].map((name) =>
      addIngredientWithAmount(name, "15-30ml")
    )
  );
  ingredients.push(await addIngredientWithAmount("Sok z cytryny", "20ml"));
  ingredients.push(await addIngredientWithAmount("Syrop cukrowy", "20ml"));
  ingredients.push(await addIngredientWithAmount("Cola", "Trochę"));

  return ingredients.map(({ id }) => ({ id }));
}

function addIngredientWithAmount(name: string, amount: string) {
  return prisma.ingredientAmount.create({
    data: {
      ingredient: { create: { name, available: true } },
      amount,
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
