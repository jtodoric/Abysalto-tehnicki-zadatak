/*
8.zadatak nisam nikako uspio riješiti, čak ni s pomoć googlea, iako ga je AI riješio bez problema,
ali nisam htio kopirati taj kod, jer ga ne razumijem u potpunosti pa ne bi bilo fer da se to računa kao moj rad.

Par zadatka sam morao promijeniti, kao što je odabir proizvodaa i boje, jer proizvoda koje je zadatak tražio nije bilo na stanju.

Također nisam na web stranici nigdje uspio naći gdje se skida PDF narudžbe pa nisam mogao rješiti 20.zadatak.
*/

const { test, expect } = require ('@playwright/test');
const {faker, fa} = require('@faker-js/faker');

test ('5.zadatak', async ({page}) => {

  const user_data = {
    ime: faker.person.firstName(),
    prezime: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    dan: faker.number.int({ min: 1, max: 28 }).toString(),
    mjesec: faker.number.int({ min: 1, max: 12 }).toString(),
    godina: faker.number.int({ min: 1919, max: 2008 }).toString(),
    adresa: faker.location.streetAddress(),
    grad: faker.location.city(),
    postanski_broj: '12345',
    telefon: '1234567890'
  };

  //1
  await page.goto ('http://www.automationpractice.pl/');

    //2
    await page.locator('.login').click();

    //3
    await page.fill ('#email_create', user_data.email);
    await page.click ('#SubmitCreate');

    //4
    await page.fill ('#customer_firstname', user_data.ime);
    await page.fill ('#customer_lastname', user_data.prezime);
    await page.fill ('#passwd', user_data.password);
    await page.selectOption ('#days', user_data.dan);
    await page.selectOption ('#months', user_data.mjesec);
    await page.selectOption ('#years', user_data.godina);
    await page.click ('#submitAccount');

    //5
    await page.waitForSelector ('.alert.alert-success');
    await page.click ('[title="Women"]');

    //6
    await page.click ('#selectProductSort');
    await page.selectOption ('#selectProductSort', 'Product Name: A to Z');

    //7
    await page.locator('#layered_id_attribute_group_11').click();

    //8
    //await page.set ('#layered_price_range', '20 - 50');

    //9
    await page.locator ('[title="Printed Summer Dress"]').first().click({force : true});

    //10 --> crne bluze nema na stanju pa sam izabro drugi proizvod i drugu boju
    await page.locator ('#color_14').click();
    await page.locator ('#group_1').click();
    await page.selectOption ('#group_1', 'M');

    //11
    await page.click ('#add_to_cart');

    //12
    const uspjesno_dodano = page.locator ('text=Product successfully added to your shopping cart');
    await expect (uspjesno_dodano).toBeVisible();


    //13
    await page.click ('[title="Continue shopping"]');

    //14
    await page.click ('[title="Contact us"]');

    //15
    await page.selectOption ('#id_contact', 'Customer service');
    const poruka = "ime--> " + user_data.ime + "\nprezime--> " + user_data.prezime + "\nemail--> " + user_data.email;
    await page.fill ('#message', poruka);
    await page.locator ('#submitMessage').click();
    const poruka_poslana = page.locator ('.alert.alert-success');
    await expect (poruka_poslana).toBeVisible();

    //16
    await page.click ('.account');

    //17
    //await page.click ('text=My personal information');
    await page.click ('.icon-user');
    const korisnicko_ime = await page.inputValue ('#firstname');
    const korisnicko_prezime = await page.inputValue ('#lastname');
    const korisnicki_mail = await page.inputValue ('#email');
    await expect (korisnicko_ime).toBe (user_data.ime);
    await expect (korisnicko_prezime).toBe (user_data.prezime);
    await expect (korisnicki_mail).toBe (user_data.email);

    //18
    await page.click ('[title="View my shopping cart"]');
    await page.locator('.standard-checkout').click();
    await page.fill ('#address1', user_data.adresa);
    await page.fill ('#city', user_data.grad);
    await page.fill ('#postcode', user_data.postanski_broj);
    await page.selectOption ('#id_state', 'Alabama');
    await page.fill ('#phone_mobile', user_data.telefon);
    await page.fill ('#alias', 'My address');
    await page.click ('text=Save');
    await page.locator('[name="processAddress"]').click();
    await page.click ('#cgv');
    await page.locator('.standard-checkout').click();
    await page.click ('.bankwire');
    //await page.locator('button[type="submit"]').click();
    await page.getByRole('button', { name: 'I confirm my order ' }).click();

    //19
    await page.click ('[title="Go to your order history page"]');

    const prvi_red = page.locator('#order-list tbody tr').first();
    const id_narudzbe = await prvi_red.locator('.history_link').innerText();
    const datum_narudzbe = await prvi_red.locator('.history_date').innerText();
    const ukupna_cijena = await prvi_red.locator('.history_price').innerText();

    //20 

    //21 Testni podaci
    console.log ('Testni podaci korišteni za registraciju i kupovinu');
    console.log ({
      Ime: user_data.ime,
      Prezime: user_data.prezime,
      Email: user_data.email,
      Lozinka: user_data.password,
      Datum_rodenja: user_data.dan + "." + user_data.mjesec + "." + user_data.godina,
      Adresa: user_data.adresa,
      Grad: user_data.grad,
      Postanski_broj: user_data.postanski_broj,
      Telefon: user_data.telefon
    });
    console.log ('Detalji narudžbe');
    console.log ('ID:', id_narudzbe);
    console.log ('Datum narudžbe:', datum_narudzbe);
    console.log ('Ukupna cijena:', ukupna_cijena);
});