(async () => {
  try {
    const Payment = await ethers.getContractFactory("PAYMENTS");

    const payment = await Payment.deploy(
      [
        "0xE3E6f8765d873D0Db89947DCba8a1dD05069f054",
        "0x69a55359B46362a42752E35ff88119FeCAB88b20",
      ],
      [20, 80]
    );

    console.log(payment.address);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
