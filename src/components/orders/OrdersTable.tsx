import { Box, Table, Thead, Tbody, Tr, Th, Td, Icon } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import * as CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import moment from "moment";

type OrdersTableTypes = {
  orders: APP.RenderOrdersTypes;
};

const OrdersTable = ({ orders }: OrdersTableTypes) => {
  const history = useHistory();

  const handleClick = (id: string) => history.push(`/orders/${id}`);

  return (
    <Table style={{ borderCollapse: "separate", borderSpacing: "0 24px" }}>
      <Thead>
        <Tr color="#4a5568">
          <Th py="0" border="none" fontWeight="semibold" fontSize="14px">
            Order ID
          </Th>
          <Th py="0" border="none" fontWeight="semibold" fontSize="14px">
            Status
          </Th>
          <Th py="0" border="none" fontWeight="semibold" fontSize="14px">
            Date purchased
          </Th>
          <Th py="0" border="none" fontWeight="semibold" fontSize="14px">
            Total
          </Th>
          <Th py="0" border="none"></Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order: APP.RenderOrderTypes) => (
          <Tr
            key={order?.orderId}
            bg="#fff"
            cursor="pointer"
            onClick={() => handleClick(order?.orderId)}
            borderRadius="md"
            boxShadow="0px 0px 2px rgba(0, 0, 0, .2)"
          >
            <Td
              px="4"
              border="none"
              borderLeftRadius="md"
              fontWeight="semibold"
            >
              {order?.orderId}
            </Td>
            <Td px="4" border="none" fontSize="14px">
              <Box
                py="1"
                px="4"
                fontSize="14px"
                borderRadius="full"
                display="inline-flex"
                className={order?.deliveryStatus.toLowerCase()}
              >
                {order?.deliveryStatus}
              </Box>
            </Td>
            <Td px="4" border="none">
              {moment(Number(order?.orderId)).format("DD/MM/YYYY")}
            </Td>

            <CurrencyFormat
              renderText={(value: number) => <Td border="none">{value}</Td>}
              decimalScale={2}
              value={order?.total}
              displayType={"text"}
              thousandSeparator={true}
              prefix="&#8358;"
            />

            <Td px="4" border="none" borderRightRadius="md">
              <Icon boxSize="20px" as={MdKeyboardArrowRight} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default OrdersTable;
